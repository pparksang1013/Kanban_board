package com.kanban.back.controller;

import com.kanban.back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
public class FileController {
    FileService fileService;
    @Autowired
    FileController(FileService fileService){this.fileService = fileService;}

    @PostMapping("/uploadfile")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        if(file.isEmpty()){
            //파일 업로드가 안됐을 시 처리
        }
        String fileName = fileService.storeFile(file);
        //확장자만 추출하는 형태 ex) exe , png, jpg ...
        String fileExt = fileName.replaceAll("^.*\\.(.*)$", "$1");

        String fileOriginalName = StringUtils.cleanPath(file.getOriginalFilename());

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/file/downloadfile/")
                .path(fileName)
                .toUriString();

        return "잘 저장 되었습니다";
    }

    @PostMapping("/uploadmultiplefiles")
    public String uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        Arrays.asList(files).stream().map(file -> uploadFile(file));
        return "잘 저장 되었습니다";
    }

    @GetMapping("/downloadfile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}