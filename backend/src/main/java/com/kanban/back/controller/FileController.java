//package com.kanban.back.controller;
//
//import org.slf4j.LoggerFactory;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.util.Properties;
//import java.util.logging.Logger;
//
//@RestController
//public class FileController {
//
//    @PostMapping("/uploadfile")
//    public void uploadFile(@RequestParam("file") MultipartFile file) {
//        if(file.isEmpty()){
//            //파일 업로드가 안됐을 시 처리
//        }
//        String fileName = fileStorageService.storeFile(file);
//        //확장자만 추출하는 형태 ex) exe , png, jpg ...
//        String fileExt = fileName.replaceAll("^.*\\.(.*)$", "$1");
//
//        String fileOriginalName = StringUtils.cleanPath(file.getOriginalFilename());
//
//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/file/downloadfile/")
//                .path(fileName)
//                .toUriString();
//
//        return new File(fileName, fileOriginalName, fileExt, fileDownloadUri);
//    }
//
//    @PostMapping("/uploadmultiplefiles")
//    public List<File> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//        return Arrays.asList(files)
//                .stream()
//                .map(file -> uploadFile(file))
//                .collect(Collectors.toList());
//    }
//
//    @GetMapping("/downloadfile/{fileName:.+}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
//        // Load file as Resource
//        Resource resource = fileStorageService.loadFileAsResource(fileName);
//
//        String contentType = null;
//        try {
//            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
//        }
//
//        // Fallback to the default content type if type could not be determined
//        if(contentType == null) {
//            contentType = "application/octet-stream";
//        }
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                .body(resource);
//    }
//}