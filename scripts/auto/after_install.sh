#!/usr/bin/env bash
install_basic_dependencies() {
    if ! rsync --help > /dev/null 2>&1
    then
        yum install -y rsync
    fi
}

install_nginx() {
    cp scripts/nginx.repo /etc/yum.repos.d/nginx.repo
    sudo -u ec2-user mkdir -p /home/ec2-user/logs

    yum clean metadata
    yum update -y
    yum install -y nginx
    nginx -t && nginx
    nginx -s quit
}

install_nginx_if_necessary() {
    if [ ! -f /etc/yum.repos.d/nginx.repo ]
    then
        install_nginx
    fi
}

update_nginx_config() {
    cp scripts/nginx.conf /etc/nginx/nginx.conf
}

update_website_code() {
    echo TODO
}

install_basic_dependencies
install_nginx_if_necessary
update_nginx_config
update_website_code
