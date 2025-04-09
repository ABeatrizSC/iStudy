package com.io.github.abeatrizsc.study_tracker_ms;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableRabbit
@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class StudyTrackerMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyTrackerMsApplication.class, args);
	}

}
