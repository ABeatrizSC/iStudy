package com.io.github.abeatrisc.study_planner_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class StudyPlannerMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyPlannerMsApplication.class, args);
	}

}
