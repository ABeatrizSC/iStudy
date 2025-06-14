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
    @Value("${rabbitmq.exchange.discipline-events}")
    private String TOPIC_DISCIPLINE_EVENTS_EXCHANGE;

    @Value("${rabbitmq.exchange.user-deleted-events}")
    private String FANOUT_USER_EVENTS_DELETED_EXCHANGE;

    @Value("${rabbitmq.queue.user-deleted}")
    private String USER_EVENTS_DELETED_QUEUE;

    @Value("${rabbitmq.queue.discipline-deleted}")
    private String DISCIPLINE_EVENTS_DISCIPLINE_DELETED_QUEUE;

    @Value("${rabbitmq.queue.discipline-updated}")
    private String DISCIPLINE_EVENTS_DISCIPLINE_UPDATED_QUEUE;

    @Value("${rabbitmq.queue.topic-deleted}")
    private String DISCIPLINE_EVENTS_TOPIC_DELETED_QUEUE;

    @Value("${rabbitmq.queue.topic-updated}")
    private String DISCIPLINE_EVENTS_TOPIC_UPDATED_QUEUE;

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_DISCIPLINE_EVENTS_EXCHANGE);
    }

    @Bean
    public FanoutExchange fanoutUserDeletedExchange() {
        return new FanoutExchange(FANOUT_USER_EVENTS_DELETED_EXCHANGE);
    }

    @Bean
    public Queue disciplineUpdateQueue() {
        return new Queue(DISCIPLINE_EVENTS_DISCIPLINE_UPDATED_QUEUE);
    }

    @Bean
    public Queue disciplineDeleteQueue() {
        return new Queue(DISCIPLINE_EVENTS_DISCIPLINE_DELETED_QUEUE);
    }

    @Bean
    public Queue topicUpdateQueue() {
        return new Queue(DISCIPLINE_EVENTS_TOPIC_UPDATED_QUEUE);
    }

    @Bean
    public Queue topicDeleteQueue() {
        return new Queue(DISCIPLINE_EVENTS_TOPIC_DELETED_QUEUE);
    }

    @Bean
    public Binding bindingDisciplineUpdate(Queue disciplineUpdateQueue, TopicExchange topicExchange) {
        return BindingBuilder.bind(disciplineUpdateQueue).to(topicExchange).with(DISCIPLINE_EVENTS_DISCIPLINE_UPDATED_QUEUE);
    }

    @Bean
    public Binding bindingDisciplineDelete(Queue disciplineDeleteQueue, TopicExchange topicExchange) {
        return BindingBuilder.bind(disciplineDeleteQueue).to(topicExchange).with(DISCIPLINE_EVENTS_DISCIPLINE_DELETED_QUEUE);
    }

    @Bean
    public Binding bindingTopicUpdate(Queue topicUpdateQueue, TopicExchange topicExchange) {
        return BindingBuilder.bind(topicUpdateQueue).to(topicExchange).with(DISCIPLINE_EVENTS_TOPIC_UPDATED_QUEUE);
    }

    @Bean
    public Binding bindingTopicDelete(Queue topicDeleteQueue, TopicExchange topicExchange) {
        return BindingBuilder.bind(topicDeleteQueue).to(topicExchange).with(DISCIPLINE_EVENTS_TOPIC_DELETED_QUEUE);
    }

    @Bean
    public Queue userDeleteQueue() {
        return new Queue(USER_EVENTS_DELETED_QUEUE);
    }

    @Bean
    public Binding bindingDeleteDisciplines(Queue userDeleteQueue, FanoutExchange fanoutUserDeletedExchange) {
        return BindingBuilder.bind(userDeleteQueue).to(fanoutUserDeletedExchange);
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

    @Bean
    public RabbitAdmin createRabbitAdmin(ConnectionFactory connectionFactory){
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    public ApplicationListener<ApplicationReadyEvent> initializeAdmin(RabbitAdmin rabbitAdmin){
        return event -> rabbitAdmin.initialize();
    }
}

