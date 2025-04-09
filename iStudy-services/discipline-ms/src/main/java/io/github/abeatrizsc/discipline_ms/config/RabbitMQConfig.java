package io.github.abeatrizsc.discipline_ms.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.exchange.name}")
    private String EXCHANGE_NAME;

    @Bean
    public RabbitAdmin createRabbitAdmin(ConnectionFactory connectionFactory){
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    public ApplicationListener<ApplicationReadyEvent> initializeAdmin(RabbitAdmin rabbitAdmin){
        return event -> rabbitAdmin.initialize();
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue disciplineUpdateQueue() {
        return new Queue("discipline.update");
    }

    @Bean
    public Queue disciplineDeleteQueue() {
        return new Queue("discipline.delete");
    }

    @Bean
    public Queue topicUpdateQueue() {
        return new Queue("topic.update");
    }

    @Bean
    public Queue topicDeleteQueue() {
        return new Queue("topic.delete");
    }

    @Bean
    public Binding bindingDisciplineUpdate(Queue disciplineUpdateQueue, TopicExchange exchange) {
        return BindingBuilder.bind(disciplineUpdateQueue).to(exchange).with("discipline.update");
    }

    @Bean
    public Binding bindingDisciplineDelete(Queue disciplineDeleteQueue, TopicExchange exchange) {
        return BindingBuilder.bind(disciplineDeleteQueue).to(exchange).with("discipline.delete");
    }

    @Bean
    public Binding bindingTopicUpdate(Queue topicUpdateQueue, TopicExchange exchange) {
        return BindingBuilder.bind(topicUpdateQueue).to(exchange).with("topic.update");
    }

    @Bean
    public Binding bindingTopicDelete(Queue topicDeleteQueue, TopicExchange exchange) {
        return BindingBuilder.bind(topicDeleteQueue).to(exchange).with("topic.delete");
    }

    @Bean
    public MessageConverter jackson2JsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}

