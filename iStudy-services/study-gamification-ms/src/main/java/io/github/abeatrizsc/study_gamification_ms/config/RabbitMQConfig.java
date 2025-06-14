package io.github.abeatrizsc.study_gamification_ms.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.exchange.user-deleted-events}")
    private String FANOUT_USER_EVENTS_DELETED_EXCHANGE_NAME;

    @Value("${rabbitmq.queue.user-deleted}")
    private String USER_EVENTS_DELETED_QUEUE_NAME;

    @Bean
    public Queue deleteGamesDataQueue() {
        return new Queue(USER_EVENTS_DELETED_QUEUE_NAME);
    }

    @Bean
    public FanoutExchange fanoutUserDeletedExchange() {
        return new FanoutExchange(FANOUT_USER_EVENTS_DELETED_EXCHANGE_NAME);
    }

    @Bean
    public Binding bindingDeleteGamesData(Queue deleteGamesDataQueue, FanoutExchange fanoutUserDeletedExchange) {
        return BindingBuilder.bind(deleteGamesDataQueue).to(fanoutUserDeletedExchange);
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

