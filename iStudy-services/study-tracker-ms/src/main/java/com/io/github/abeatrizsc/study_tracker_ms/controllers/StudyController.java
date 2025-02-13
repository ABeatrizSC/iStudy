package com.io.github.abeatrizsc.study_tracker_ms.controllers;

import com.io.github.abeatrizsc.study_tracker_ms.services.StudyService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studies")
@AllArgsConstructor
public class StudyController {
    private StudyService service;
}
