package com.io.github.abeatrizsc.study_tracker_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class StudyTrackerMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyTrackerMsApplication.class, args);
	}

}
