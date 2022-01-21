package com.example.taks_2229_2021_user.service.impl;

import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.payload.DataMailDTO;
import com.example.taks_2229_2021_user.service.ClientService;
import com.example.taks_2229_2021_user.service.MailService;
import com.example.taks_2229_2021_user.util.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private MailService mailService;

    @Override
    public Boolean signup(Users sdi) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);

            Map<String, Object> props = new HashMap<>();
            props.put("firstname", sdi.getFirstname());
            props.put("lastname", sdi.getLastname());
            props.put("username", sdi.getUsername());
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
            return true;
        } catch (MessagingException exp) {
            exp.printStackTrace();
        }
        return false;
    }
    @Override
    public Boolean create(Users sdi, String password) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_CREATE_USER);

            Map<String, Object> props = new HashMap<>();
            props.put("firstname", sdi.getFirstname());
            props.put("lastname", sdi.getLastname());
            props.put("username", sdi.getUsername());
            props.put("password", password);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_CREATE_USER);
            return true;
        } catch (MessagingException exp) {
            exp.printStackTrace();
        }
        return false;
    }
    @Override
    public void forgotPassword(Users sdi, String password) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_FORGET_PASSWORD);

            Map<String, Object> props = new HashMap<>();
            props.put("firstname", sdi.getFirstname());
            props.put("lastname", sdi.getLastname());
            props.put("password", password);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_FORGET_PASSWORD);
        } catch (MessagingException exp) {
            exp.printStackTrace();
        }
    }
}
