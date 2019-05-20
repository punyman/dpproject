<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/20
 * Time: 14:47
 */
namespace app\admin\model;

use think\Db;
use think\Model;

class Article extends Model
{
    public function get_all_category()
    {
        $list = Db::name('article_category')->where(['pid' => 0])->order('displayorder desc')->select();
        foreach ($list as &$value) {
            $value['items'] = Db::name('article_category')->where(['pid' => $value['id']])->order('displayorder desc')->select();
            if ($value['items']) {
                foreach ($value['items'] as &$val) {
                    $val['items'] = Db::name('article_category')->where(['pid' => $val['id']])->order('displayorder desc')->select();
                }
                unset($val);
            }
        }
        unset($value);
        return $list;
    }
}