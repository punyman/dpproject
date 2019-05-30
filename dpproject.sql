/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : dpproject

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-05-30 17:19:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dp_article_category
-- ----------------------------
DROP TABLE IF EXISTS `dp_article_category`;
CREATE TABLE `dp_article_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `thumb` varchar(255) DEFAULT '',
  `displayorder` int(11) DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_article_category
-- ----------------------------

-- ----------------------------
-- Table structure for dp_article_content
-- ----------------------------
DROP TABLE IF EXISTS `dp_article_content`;
CREATE TABLE `dp_article_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate` int(11) DEFAULT '0',
  `thumb` varchar(255) DEFAULT '',
  `author` varchar(255) DEFAULT '',
  `create_time` int(11) DEFAULT '0',
  `title` varchar(255) DEFAULT '',
  `subtitle` varchar(255) DEFAULT '',
  `click` int(11) DEFAULT '0',
  `displayorder` int(11) DEFAULT '0',
  `is_recommend` tinyint(1) DEFAULT '0',
  `content` text,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_article_content
-- ----------------------------

-- ----------------------------
-- Table structure for dp_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `dp_auth_group`;
CREATE TABLE `dp_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_auth_group
-- ----------------------------
INSERT INTO `dp_auth_group` VALUES ('1', '超级管理员', '1', '12,13,14,15,16,17,18,19,20,21,25,26,27,28,29,30,31,32,33,34,35,36');

-- ----------------------------
-- Table structure for dp_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `dp_auth_group_access`;
CREATE TABLE `dp_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_auth_group_access
-- ----------------------------
INSERT INTO `dp_auth_group_access` VALUES ('1', '1');
INSERT INTO `dp_auth_group_access` VALUES ('3', '1');
INSERT INTO `dp_auth_group_access` VALUES ('4', '1');

-- ----------------------------
-- Table structure for dp_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `dp_auth_rule`;
CREATE TABLE `dp_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  `pid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_auth_rule
-- ----------------------------
INSERT INTO `dp_auth_rule` VALUES ('16', 'rule/delete', '删除', '1', '1', '', '13');
INSERT INTO `dp_auth_rule` VALUES ('15', 'rule/add', '添加', '1', '1', '', '13');
INSERT INTO `dp_auth_rule` VALUES ('12', 'rule', '权限控制', '1', '1', '', '0');
INSERT INTO `dp_auth_rule` VALUES ('13', 'rule/index', '权限管理', '1', '1', '', '12');
INSERT INTO `dp_auth_rule` VALUES ('14', 'rule/edit', '编辑', '1', '1', '', '13');
INSERT INTO `dp_auth_rule` VALUES ('17', 'rule/group', '角色管理', '1', '1', '', '12');
INSERT INTO `dp_auth_rule` VALUES ('18', 'rule/group_add', '添加', '1', '1', '', '17');
INSERT INTO `dp_auth_rule` VALUES ('19', 'rule/group_edit', '编辑', '1', '1', '', '17');
INSERT INTO `dp_auth_rule` VALUES ('20', 'rule/group_delete', '删除', '1', '1', '', '17');
INSERT INTO `dp_auth_rule` VALUES ('21', 'rule/group_authorize', '分配权限', '1', '1', '', '17');
INSERT INTO `dp_auth_rule` VALUES ('25', 'rule/users', '用户管理', '1', '1', '', '12');
INSERT INTO `dp_auth_rule` VALUES ('27', 'rule/user_edit', '编辑用户', '1', '1', '', '25');
INSERT INTO `dp_auth_rule` VALUES ('26', 'rule/user_add', '添加用户', '1', '1', '', '25');
INSERT INTO `dp_auth_rule` VALUES ('28', 'rule/log', '日志查看', '1', '1', '', '12');
INSERT INTO `dp_auth_rule` VALUES ('29', 'article/category', '文章分类', '1', '1', '', '0');
INSERT INTO `dp_auth_rule` VALUES ('30', 'article/category_add', '添加分类', '1', '1', '', '29');
INSERT INTO `dp_auth_rule` VALUES ('31', 'article/category_edit', '编辑分类', '1', '1', '', '29');
INSERT INTO `dp_auth_rule` VALUES ('32', 'article/category_delete', '删除分类', '1', '1', '', '29');
INSERT INTO `dp_auth_rule` VALUES ('33', 'article/contents', '文章列表', '1', '1', '', '0');
INSERT INTO `dp_auth_rule` VALUES ('34', 'article/content_add', '添加文章', '1', '1', '', '33');
INSERT INTO `dp_auth_rule` VALUES ('35', 'article/content_edit', '编辑文章', '1', '1', '', '33');
INSERT INTO `dp_auth_rule` VALUES ('36', 'article/content_delete', '删除文章', '1', '1', '', '33');

-- ----------------------------
-- Table structure for dp_log
-- ----------------------------
DROP TABLE IF EXISTS `dp_log`;
CREATE TABLE `dp_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `remark` varchar(255) DEFAULT '',
  `ip` varchar(50) DEFAULT '',
  `action` varchar(50) DEFAULT '',
  `uid` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=153 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_log
-- ----------------------------

-- ----------------------------
-- Table structure for dp_users
-- ----------------------------
DROP TABLE IF EXISTS `dp_users`;
CREATE TABLE `dp_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `salt` varchar(50) DEFAULT '',
  `status` tinyint(1) DEFAULT '1',
  `mobile` varchar(11) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `nickname` varchar(255) DEFAULT '',
  `avatar` varchar(255) DEFAULT '',
  `last_login_ip` varchar(15) DEFAULT '',
  `last_login_time` int(11) DEFAULT '0',
  `create_time` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dp_users
-- ----------------------------
INSERT INTO `dp_users` VALUES ('1', 'admin', 'd8d325f17a91341960e2718f0f998254eb700c51', 'icxGkbID', '1', '13522488888', '472667562@qq.com', '472667562@qq.com', '', '', '0', '0');
