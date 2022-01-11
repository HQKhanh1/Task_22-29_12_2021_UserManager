package com.example.taks_2229_2021_user.service;

import com.example.taks_2229_2021_user.payload.DataMailDTO;

import javax.mail.MessagingException;

public interface MailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
