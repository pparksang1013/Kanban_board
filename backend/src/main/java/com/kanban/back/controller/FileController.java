package com.kanban.back.controller;

import com.kanban.back.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
public class FileController {
    FileService fileService;
    @Autowired
    FileController(FileService fileService){this.fileService = fileService;}

    // 하나의 파일만 보낼 때 사용
    @PostMapping("/uploadfile")
    public void uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("c_id") Integer c_id) {
        if(file.isEmpty()){
            //파일 업로드가 안됐을 시 처리
        }
        fileService.storeFile(file, c_id);
    }

    // 여러개의 파일을 보낼 때 사용
    @PostMapping("/uploadmultiplefiles")
    public String uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("c_id") Integer c_id) {
        for (MultipartFile file : files){
            fileService.storeFile(file,1);
        }
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