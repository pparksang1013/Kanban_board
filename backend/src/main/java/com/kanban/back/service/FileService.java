package com.kanban.back.service;

import com.kanban.back.Exception.FileStorageException;
import com.kanban.back.Exception.MyFileNotFoundException;
import com.kanban.back.dto.requestDTO.CardReqDTO;
import com.kanban.back.dto.requestDTO.FilesReqDTO;
import com.kanban.back.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Service
public class FileService {
    private final Path fileStorageLocation = Paths.get("C:/Users/upload");
    @Autowired
    FilesRepository filesRepository;

    public String storeFile(MultipartFile file, Integer c_id) {
        SimpleDateFormat sdf = new SimpleDateFormat ("yyyyMMddhhmmss_");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String timeStamp = sdf.format(timestamp);

        String fileName = timeStamp + StringUtils.cleanPath(file.getOriginalFilename());

        //확장자만 추출하는 형태 ex) exe , png, jpg ...
        String fileExt = fileName.replaceAll("^.*\\.(.*)$", "$1");
        // File DB에 저장
        String filepath = this.fileStorageLocation.toString();
        Long fileSize = file.getSize();
        FilesReqDTO filesReqDTO = new FilesReqDTO();
        filesReqDTO.setFile_name(fileName);
        filesReqDTO.setFile_path(filepath);
        filesReqDTO.setFile_ext(fileExt);
        filesReqDTO.setFile_size(fileSize);
        filesReqDTO.setCardReqDTO(CardReqDTO.builder().c_id(c_id).build());
        com.kanban.back.entity.Files files = filesReqDTO.toEntity();
        filesRepository.save(files);

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("잘못된 파일 경로 입니다" + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException(fileName + "파일을 저장할 수 없습니다 다시 시도해 주십쇼", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("파일을 찾을 수 없습니다" + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("파일을 찾을 수 없습니다" + fileName, ex);
        }
    }
}