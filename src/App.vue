<template>
  <div id="app">
      <button @click="exportList">导出</button>
      <table style="border-collapse: collapse; width: 100%;" border="1">
          <tbody>
          <tr>
              <td style="width: 31.5994%;">姓名</td>
              <td style="width: 31.5994%;">年龄</td>
              <td style="width: 31.5994%;">性别</td>
          </tr>
          <tr v-for="(item,index) in list" :key="index">
              <td style="width: 31.5994%;">{{item.name}}</td>
              <td style="width: 31.5994%;">{{item.age}}</td>
              <td style="width: 31.5994%;">{{item.sex}}</td>
          </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import datatablejson from "./data/table.json";
//导入 xlsx  只能解构
import {utils} from "xlsx";

//导入下载文件
import {saveAs} from "file-saver";

//导入样式下载
import xlsxStyle from "xlsx-style";

//导入更改 xlsx 样式
import __excelStyle_index from "./excelStyle/index";


export default {
  name: 'App',
  components: {
    HelloWorld,
  },
    data() {
        return {
            list: datatablejson.data
        }
    },
    methods: {
        exportList() {
            // console.log(xlsx,'slsx')
            const header = ['序号','名字','年龄','性别']
            // console.log(XLSX)
            const list = this.list.map((ele,index)=>{
                return {
                    "序号":index+1,
                    "名字":ele.name,
                    "年龄":ele.age,
                    "性别":ele.sex
                }
            })
            // 创建一个工作簿
            const workbook = utils.book_new();

            // 使用json数据创建 一张表
            const worksheet =utils.json_to_sheet(list,{
                header:header,
                //头部数据设置从A2开始
                origin:'A2'
            });
            //样式处理
            __excelStyle_index(worksheet)
            // 导出格式
            let wopt = {
                bookType:'xlsx',//导出的文件类型
                bookSST:false,//
                type:'binary',//二进制字符串
            };
            //
            utils.book_append_sheet(workbook,worksheet,'花名册')
            let wbout =  xlsxStyle.write(workbook,wopt);
            let blob = new Blob([this.binaryToBlob(wbout)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            saveAs(blob,'名单.xlsx')
        },
        // 二进制转blob
        binaryToBlob(binary){
            var buf,len = binary.length,i=0;
            if (typeof ArrayBuffer !== 'undefined') {
                buf = new ArrayBuffer(len);
                var view = new Uint8Array(buf);
                while(i<len){
                    view[i] = binary.charCodeAt(i) & 0xff;
                    i++
                }
                return buf
            }else{
                buf = new Array(len);
                while(i<len){
                    buf[i] = binary.charCodeAt(i) & 0xff;
                    i++
                }
                return buf
            }
        },

    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
