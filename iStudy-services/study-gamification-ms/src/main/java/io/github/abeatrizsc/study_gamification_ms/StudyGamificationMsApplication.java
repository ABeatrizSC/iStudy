package io.github.abeatrizsc.study_gamification_ms;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableRabbit
@EnableDiscoveryClient
@SpringBootApplication
public class StudyGamificationMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyGamificationMsApplication.class, args);
	}

}
