package de.studytrade.studytradebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StudytradeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudytradeBackendApplication.class, args);
	}

}
