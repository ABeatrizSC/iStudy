package io.github.abeatrizsc.discipline_ms;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableRabbit
@EnableDiscoveryClient
@SpringBootApplication
public class DisciplineMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisciplineMsApplication.class, args);
	}

}
