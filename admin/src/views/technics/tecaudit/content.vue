<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">
    <el-form :inline="true" ref="dataForm" :disabled="title=='查看'" :model="temp" :rules="rules" label-position="left" label-width="120px">
      <!--基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称" prop="name">
            <el-input v-model="temp.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="temp.code" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="model">
            <el-input v-model="temp.model" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="creatorShow">
            <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="creationtime">
            <el-input v-model="temp.creationtime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改人" prop="modifierShow">
            <el-input v-model="temp.modifierShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="最后修改时间" prop="modifiedtime">
            <el-input v-model="temp.modifiedtime" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="单据状态" prop="technicsState">
            <el-select v-model="temp.technicsState" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in technicsStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <!--客户信息-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="客户信息">

          <el-form-item label="客户" prop="pkCustomer">
            <el-select v-model="temp.pkCustomer" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in customerOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="采购联系人" prop="purchaseContacts" v-if="refshCustomDocOpflag">
            <el-select v-model="temp.purchaseContacts" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in customdocOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="技术联系人" prop="skillContacts"  v-if="refshCustomDocOpflag">
            <el-select v-model="temp.skillContacts" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in customdocOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="销售负责人" prop="pkPsndoc">
            <el-select v-model="temp.pkPsndoc" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in psndocOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <!--工艺选项-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="工艺选项">
          <el-form-item label="SMT焊点" prop="smt">
            <el-input v-model="temp.smt" placeholder="SMT焊点"></el-input>
          </el-form-item>
          <el-form-item label="DIP焊点" prop="dip">
            <el-input v-model="temp.dip" placeholder="DIP焊点"></el-input>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="组装" prop="isinstal">
                <el-select v-model="temp.isinstal" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in yesOrNoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="组装时间" prop="instalMin">
                <el-input v-model="temp.instalMin" :disabled="temp.isinstal === '0' ? true : false"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="测试" prop="istest">
                <el-select v-model="temp.istest" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in yesOrNoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="测试时间" prop="testMin">
                <el-input v-model="temp.testMin" :disabled="temp.istest === '0' ? true : false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="老化" prop="isaging">
                <el-select v-model="temp.isaging" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in yesOrNoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="老化时间" prop="agingMin">
                <el-input v-model="temp.agingMin" :disabled="temp.isaging === '0' ? true : false"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="三防" prop="defense">
                <el-select v-model="temp.defense" placeholder="请选择" :disabled="true">
                  <el-option
                    v-for="item in yesOrNoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :span="8">
              <el-form-item label="三防面积" prop="defenseArea">
                <el-input v-model="temp.defenseArea" :disabled="temp.defense === '0' ? true : false"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="焊接工艺" prop="sealTechnics">
            <el-select v-model="temp.sealTechnics" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in sealTechnicsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物料来源" prop="materialSource">
            <el-select v-model="temp.materialSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="执行标准" prop="exeStandard">
            <el-select v-model="temp.exeStandard" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in exeStandardOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钢网来源" prop="steelMeshSource">
            <el-select v-model="temp.steelMeshSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="特殊工艺" prop="specialTechnics">
            <el-select v-model="temp.specialTechnics" placeholder="请选择">
              <el-option
                v-for="item in specialTechnicsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <br/>
      <el-form-item label="PCB" prop="ispcb" label-width="200px">
        <el-switch v-model="temp.ispcb" active-value="是" inactive-value="否" :disabled="true"></el-switch>
      </el-form-item>

      <!--PCB参数-->
      <el-tabs type="border-card" v-if="temp.ispcb === '是' ? true : false">
        <el-tab-pane label="PCB参数">
          <el-form-item label="长（cm）" prop="pcbLong">
            <el-input v-model="temp.pcbLong" placeholder="单位：cm" @change="pubWidthLongChange('pcbLong')"></el-input>
          </el-form-item>
          <el-form-item label="宽（cm）" prop="pcbWide">
            <el-input v-model="temp.pcbWide" placeholder="单位：cm" @change="pubWidthLongChange('pcbWide')"></el-input>
          </el-form-item>

          <el-form-item label="PCB来源" prop="pcbSource">
            <el-select v-model="temp.pcbSource" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="板子厚度" prop="pcbThick">
            <el-select v-model="temp.pcbThick" placeholder="请选择">
              <el-option
                v-for="item in pcbThickOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊颜色" prop="pcbResistColor">
            <el-select v-model="temp.pcbResistColor" placeholder="请选择">
              <el-option
                v-for="item in pcbResistColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字符颜色" prop="pcbCharColor">
            <el-select v-model="temp.pcbCharColor" placeholder="请选择">
              <el-option
                v-for="item in pcbCharColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊覆盖" prop="pcbResistCover">
            <el-select v-model="temp.pcbResistCover" placeholder="请选择">
              <el-option
                v-for="item in pcbResistCoverOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="焊盘喷镀" prop="pcbPadSpary">
            <el-select v-model="temp.pcbPadSpary" placeholder="请选择">
              <el-option
                v-for="item in pcbPadSparyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="铜厚" prop="pcbCopperThick">
            <el-select v-model="temp.pcbCopperThick" placeholder="请选择">
              <el-option
                v-for="item in pcbCopperThick"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <br/>
      <el-form-item label="制具(默认乙方提供)" prop="ismakeTool" label-width="200px">
        <el-switch v-model="temp.ismakeTool" active-value="是" inactive-value="否" :disabled="true"></el-switch>
      </el-form-item>
      <el-tabs type="border-card" v-if="temp.ismakeTool === '是' ? true : false">
        <el-tab-pane label="制具参数">
          <!-- <el-form-item label="钢网制具" prop="makeSteelMesh">
            <el-select v-model="temp.makeSteelMesh" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="DIP制具" prop="makeDip">
            <el-select v-model="temp.makeDip" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="测试制具" prop="makeTest">
            <el-select v-model="temp.makeTest" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="三防制具" prop="makeDefense">
            <el-select v-model="temp.makeDefense" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="老化制具" prop="makeAging">
            <el-select v-model="temp.makeAging" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <!--附件上传-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="附件上传">
          <!--BOM文件-->
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="BOMFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="BOMFileChange"
              :before-remove="BOMFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">BOM文件   <em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                1: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>

          <!--PCB文件-->
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="PCBUpload"
              :action="uploadUrl"
              :file-list="PCBFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="PCBFileChange"
              :before-remove="PCBFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">PCB文件   <em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                1: pcb文件必须为.rar或是.zip格式压缩包文件。
                <br/>
                2: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>

          <!--工艺文件-->
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="GONGYIUpload"
              :action="uploadUrl"
              :file-list="GONGYIFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="GONGYIFileChange"
              :before-remove="GONGYIFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">工艺文件   <em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                1: 工艺文件必须为.rar或是.zip格式压缩包文件。
                <br/>
                2: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <br/>
    <el-form>
      <el-form-item label="物料信息" prop="showMaterielData" label-width="200px">
        <el-switch v-model="showMaterielData"></el-switch>
      </el-form-item>
      <el-tabs type="border-card" v-if="showMaterielData">
        <el-tab-pane label="物料信息">
          <el-table
          :data="temp.materielPoList"
          border
          style="width: 100%">
          <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
          <el-table-column prop="pkProduct" v-if="false"></el-table-column>
          <el-table-column prop="pkPurchaseQuote" v-if="false"></el-table-column>
          <el-table-column label="序号" prop="rowNum" width="120"></el-table-column>
          <el-table-column label="物料类型" prop="itemType" width="120"></el-table-column>
          <el-table-column label="型号" prop="model" width="120"></el-table-column>
          <el-table-column label="物料名称" prop="materialName" width="120"></el-table-column>
          <el-table-column label="存货全名" prop="materialFullname" width="120"></el-table-column>
          <el-table-column label="存货型号" prop="potting" width="120"></el-table-column>
          <el-table-column label="存货规格" prop="norms" width="120"></el-table-column>
          <el-table-column label="位号" prop="placeNumber" width="120"></el-table-column>
          <el-table-column label="焊点数" prop="weldingNumber" width="120"></el-table-column>
          <el-table-column label="备注" prop="memo" width="120"></el-table-column>
          <el-table-column label="品牌" prop="brand" width="120"></el-table-column>
          <el-table-column label="单位" prop="usegUnit" width="120"></el-table-column>
          <el-table-column label="用量" prop="usageNum" width="120"></el-table-column>
          <el-table-column label="总用量" prop="usageTotal" width="120"></el-table-column>
          <el-table-column label="配料数量" prop="batchingNumber" width="120"></el-table-column>
          <el-table-column label="领料数量" prop="pickingNumber" width="120"></el-table-column>
          <el-table-column label="退料数量" prop="backingNumber" width="120"></el-table-column>
          <el-table-column label="采购单价" prop="purchaseUnitPrice" width="120"></el-table-column>
          <el-table-column label="采购总价" prop="purchaseTotalPrice" width="120"></el-table-column>
          
          <el-table-column label="图片预览" prop="itemType" width="100">
            <template slot-scope="scope">
              <div class="demo-image__preview">
                <el-image 
                  style="width: 80px; height: 80px"
                  :src="scope.row.previewUrlShow"
                  :preview-src-list="scope.row.previewUrlListShow">
                </el-image>
              </div>
            </template>
          </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title!='查看'">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { listCustomerAsRef, selectCustomdocDefaultPsn, selectAllCustomdocAsRef } from '@/api/customer/customer'
import { saveProductFile } from '@/api/salemage/product'
import { downloadProductFile } from '@/api/pub/pub'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { selectPurchaseMaterielByPkProduct } from '@/api/technics/tecaudit'

export default {
  name: 'Tecauditcontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns'
    ])
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        let numVal = Number.parseFloat(value)
        if (numVal && Number.isFinite(numVal) && Number.isInteger(numVal)) {
          callback()
        } else {
          return callback(new Error('订单数量必须为整数数字类型'))
        }
      } else {
        callback()
      }
    }
    return {
      contentVisiable: false, // dialog 显示框
      showMaterielData: false, // 是否显示物料信息
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      // BOM文件相关
      BOMFileList: [],
      BOMFile: null,
      // PCB文件相关
      PCBFileList: [],
      PCBFile: null,
      // 工艺文件相关
      GONGYIFileList: [],
      GONGYIFile: null,
      temp: {
        pkProduct: undefined,
        name: '',
        code: 'CP' + randomNum(100*1000),
        model: '',
        pkPsndoc: null,
        purchaseContacts: null,
        skillContacts: null,
        smt: null,
        dip: null,
        isinstal: '0',
        instalMin: null,
        istest: '0',
        testMin: null,
        isaging: '0',
        agingMin: null,
        defense: '0',
        defenseArea: null,
        sealTechnics: '1',
        materialSource: '1',
        exeStandard: '0',
        steelMeshSource: '0',
        ispcb: '否',
        pcbSource: '0',
        pcbLong: null,
        pcbWide: null,
        pcbThick: 1.6,
        pcbResistColor: '绿色',
        pcbCharColor: '白色',
        pcbResistCover: '0',
        pcbPadSpary: '0',
        pcbCopperThick: '0',
        pkCustomer: null,
        orderNumber: null,
        bomFilename: '',
        bomFilefullname: '',
        pcbFilename: '',
        pcbFilefullname: '',
        craftFilename: '',
        craftFilefullname: '',
        ismakeTool: '是',
        makeSteelMesh: '1',
        makeDip: '1',
        makeTest: '1',
        makeDefense: '1',
        makeAging: '1',
        technicsState: 20,
        creator: '',
        creatorShow: '',
        creationtime: parseTime(new Date()),
        modifier: '',
        modifierShow: '',
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        materielPoList: [],
      },
      // 页面填写数据规则校验
      rules: {
        // smt数据校验
        smt: [
          {validator: checkNumberAsInt, trigger: 'blur' },
          { required: true, message: '请输入SMT焊点', trigger: 'blur' }
        ],
        // dip数据校验
        dip: [
          {validator: checkNumberAsInt, trigger: 'blur' },
          { required: true, message: '请输入DIP焊点', trigger: 'blur' }
        ],
        // 组装时间
        instalMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 测试时间
        testMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 老化时间
        agingMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 三防面积
        defenseArea: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // PCB长数据校验
        pcbLong: [
          // {trigger: 'blur' }
        ],
        // PCB宽校验
        pcbWide: [
          // {trigger: 'blur' }
        ],
      },
      yesOrNoOption: [
        { value: '0', label: '否' },
        { value: '1', label: '是' }
      ],
      sealTechnicsOption: [ // 焊接工艺
        { value: '0', label: '无铅' },
        { value: '1', label: '有铅' },
        { value: '2', label: 'RoSH' }
      ],
      materialSourceOption: [ // 物料来源
        { value: '1', label: '甲方提供' },
        { value: '2', label: '乙方提供' },
        { value: '3', label: '部分甲方提供' }
      ],
      exeStandardOption: [ // 执行标准
        { value: '0', label: '民用' },
        { value: '1', label: '医疗' },
        { value: '2', label: '军工' }
      ],
      steelMeshSourceOption: [ // 钢网来源
        { value: '0', label: '无' },
        { value: '1', label: '甲方提供' },
        { value: '2', label: '乙方提供' }
      ],
      pcbThickOption: [ // 板子厚度
        { value: 0.4, label: '0.4' },
        { value: 0.6, label: '0.6' },
        { value: 0.8, label: '0.8' },
        { value: 1.0, label: '1.0' },
        { value: 1.2, label: '1.2' },
        { value: 1.6, label: '1.6' },
        { value: 2.0, label: '2.0' }
      ],
      pcbResistColorOption: [ // 阻焊颜色
        { value: '绿色', label: '绿色' },
        { value: '红色', label: '红色' },
        { value: '黄色', label: '黄色' },
        { value: '蓝色', label: '蓝色' },
        { value: '白色', label: '白色' },
        { value: '黑色', label: '黑色' }
      ],
      pcbCharColorOption: [ // 字符颜色
        { value: '白色', label: '白色' }
      ],
      pcbResistCoverOption: [ // 阻焊覆盖
        { value: '0', label: '过孔盖油' },
        { value: '1', label: '过孔开窗' }
      ],
      pcbPadSparyOption: [ // 焊盘喷镀
        { value: '0', label: '有铅喷锡' },
        { value: '1', label: '无铅喷锡' },
        { value: '2', label: '沉金' }
      ],
      pcbCopperThick: [ // 铜厚
        { value: '0', label: '1盎司' },
        { value: '1', label: '2盎司' }
      ],
      technicsStateOprion: [
        { value: 0, label: '自由态' },
        { value: 20, label: '已申请' },
        { value: 21, label: '工艺审核中' },
        { value: 22, label: '工艺审核完成' }
      ],
      specialTechnicsOption: [
        { value: '0', label: '无特殊工艺' },
        { value: '1', label: '有特殊工艺' }
      ],
      // 客户信息参照
      customerOption: [],
      // 客户人员档案信息参照
      customdocOprion: [],
      // 人员信息参照
      psndocOption: [],
      //查询客户人员参照后重新刷新客户人员数据标志
      refshCustomDocOpflag: false
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      // 审核动作
      if (this.title === '详情' && this.updateRow) {
        this.restTemp()
        this.temp = this.updateRow
        if (this.updateRow.bomFilename) {
          let BOMFileName = { name: this.updateRow.bomFilename, fullName: this.updateRow.bomFilefullname }
          this.BOMFileList = [ BOMFileName ]
        }
        if (this.updateRow.pcbFilename) {
          let PCBFileName = { name: this.updateRow.pcbFilename, fullName: this.updateRow.pcbFilefullname }
          this.PCBFileList = [ PCBFileName ]
        }
        if (this.updateRow.craftFilename) {
          let CRAFTFileName = { name: this.updateRow.craftFilename, fullName: this.updateRow.craftFilefullname }
          this.GONGYIFileList = [ CRAFTFileName ]
        }
        // 初始客户人员参照信息
        let queryParam = { pkCustomer: this.temp.pkCustomer }
        selectAllCustomdocAsRef(queryParam).then((response) => {
          if (response.object) {
            this.customdocOprion = response.object
            parseRefKeyInt(this.customdocOprion)
            this.refshCustomDocOpflag = true
          }
        })
      }
      // 查看动作
      if (this.title === '查看' && this.updateRow) {
        this.restTemp()
        this.temp = this.updateRow
        if (this.updateRow.bomFilename) {
          let BOMFileName = { name: this.updateRow.bomFilename, fullName: this.updateRow.bomFilefullname }
          this.BOMFileList = [ BOMFileName ]
        }
        if (this.updateRow.pcbFilename) {
          let PCBFileName = { name: this.updateRow.pcbFilename, fullName: this.updateRow.pcbFilefullname }
          this.PCBFileList = [ PCBFileName ]
        }
        if (this.updateRow.craftFilename) {
          let CRAFTFileName = { name: this.updateRow.craftFilename, fullName: this.updateRow.craftFilefullname }
          this.GONGYIFileList = [ CRAFTFileName ]
        }
        // 初始客户人员参照信息
        let queryParam = { pkCustomer: this.temp.pkCustomer }
        selectAllCustomdocAsRef(queryParam).then((response) => {
          if (response.object) {
            this.customdocOprion = response.object
            parseRefKeyInt(this.customdocOprion)
            this.refshCustomDocOpflag = true
          }
        })

        // 预制物料信息的图片URL信息
        let queryMaterielParam = {
          pkProduct: this.temp.pkProduct
        }
        selectPurchaseMaterielByPkProduct(queryMaterielParam).then((response) => {
          if (response.success) {
            this.temp.materielPoList = response.object
            let tempThis = this.temp
            if (tempThis && tempThis.materielPoList) {
              let materielPoList = tempThis.materielPoList
              for (let index in materielPoList) {
                let dataOne = materielPoList[index]
                if (dataOne && dataOne.previewUrl) {
                  dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl
                  let previewUrlListShow = [dataOne.previewUrlShow]
                  dataOne.previewUrlListShow = previewUrlListShow
                }
              }
            }
          }
        })
      }
    }
  },
  created() {
    // 初始客户信息参照
    listCustomerAsRef().then((response) => {
      this.customerOption = response.object
      parseRefKeyInt(this.customerOption)
    })
    // 初始人员信息参照
    listBdPsndocAsRef().then((response) => {
      this.psndocOption = response.object
      parseRefKeyInt(this.psndocOption)
    })
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    BOMFileChange(file, fileList) { // 记录BOM文件
      this.BOMFile = file
    },
    BOMFileRemove(file, fileList) { // BOM文件删除
      this.BOMFile = null
    },
    PCBFileChange(file, fileList) { // 记录PCB文件
      this.PCBFile = file
    },
    PCBFileRemove(file, fileList) { // PCB文件删除
      this.PCBFile = null
    },
    GONGYIFileChange(file, fileList) { // 记录工艺文件
      this.GONGYIFile = file
    },
    GONGYIFileRemove(file, fileList) { // 工艺文件删除
      this.GONGYIFile = null
    },
    // 文件下载
    downloadProccessFile(file) {
      let fileName = file.name
      let fileFullName = file.fullName
      if (fileName && fileFullName) {
        let downLoadParma = {fileName: fileName, fileFullName: fileFullName}
        downloadProductFile(downLoadParma).then((response) => {
          const blob = response.data
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = (e) => {
            const a = document.createElement('a')
            if (fileName) {
              a.download = fileName
            } else {
              a.download = fileName
            }
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }
        })
      }
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // PCB长宽数据格式
    pubWidthLongChange(pcblet) {
      // PCB长
      if (pcblet === 'pcbLong') {
        let sourcepcbLong = Number.parseFloat(this.temp.pcbLong)
        if (isNaN(sourcepcbLong)) {
          this.temp.pcbLong = 0
        } else {
          this.temp.pcbLong = sourcepcbLong.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        }
      }
      // PCB宽
      if (pcblet === 'pcbWide') {
        let sourcepcbWide = Number.parseFloat(this.temp.pcbWide)
        if (isNaN(sourcepcbWide)) {
          this.temp.pcbWide = 0
        } else {
          this.temp.pcbWide = sourcepcbWide.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        }
      }
    },
    sureDialog() { // 确定保存回调Dialog
      let formData = new FormData()
      if (this.title === '录入' && (this.BOMFile == null || this.PCBFile == null || this.GONGYIFile == null)) {
        this.$message.warning('上传文件不完整!请选择需要上传的文件。')
        return
      } else {
        if (this.BOMFile) {
          formData.append(`bomfile`, this.BOMFile.raw)
        }
        if (this.PCBFile) {
          formData.append(`pcbfile`, this.PCBFile.raw)
        }
        if (this.GONGYIFile) {
          formData.append(`gongyifile`, this.GONGYIFile.raw)
        }
        formData.append(`productCode`, this.temp.code)
      }

      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          // 保存上传的文件
          saveProductFile(formData).then((response) => {
            if (response.object) {
              this.temp.bomFilename = response.object.BOM_FILE_NAME
              this.temp.bomFilefullname = response.object.BOM_FILE_FULL_NAME
              this.temp.pcbFilename = response.object.PCB_FILE_NAME
              this.temp.pcbFilefullname = response.object.PCB_FILE_FULL_NAME
              this.temp.craftFilename = response.object.CRAFT_FILE_NAME
              this.temp.craftFilefullname = response.object.CRAFT_FILE_FULL_NAME

              const actTemp = this.temp
              if (this.action) {
                initReplaceUpdateData(actTemp, this.replace)
                this.action(actTemp).then((response) => {
                  if (response.primary) {
                    actTemp.pkProvince = response.primary
                  }
                  if (response.success) {
                    initReplaceAddData(actTemp, this.replace)
                    this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
                    this.$message({ message: '操作成功', type: 'success' })
                    this.$emit('close', null)
                    this.$emit('refreshList', null)
                  } else {
                    this.$message({ message: `操作失败:${response.message}`, type: 'error' })
                  }
                })
              }
            }
          })
        } else {
          this.$message.warning('表单验证未通过!')
          return false
        }
      })
      
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkProduct: undefined,
        name: '',
        code: 'CP' + randomNum(100*1000),
        model: '',
        pkPsndoc: null,
        purchaseContacts: null,
        skillContacts: null,
        smt: null,
        dip: null,
        isinstal: '0',
        instalMin: null,
        istest: '0',
        testMin: null,
        isaging: '0',
        agingMin: null,
        defense: '0',
        defenseArea: null,
        sealTechnics: '1',
        materialSource: '1',
        exeStandard: '0',
        steelMeshSource: '0',
        ispcb: '否',
        pcbSource: '0',
        pcbLong: null,
        pcbWide: null,
        pcbThick: 1.6,
        pcbResistColor: '绿色',
        pcbCharColor: '白色',
        pcbResistCover: '0',
        pcbPadSpary: '0',
        pcbCopperThick: '0',
        pkCustomer: null,
        orderNumber: null,
        bomFilename: '',
        bomFilefullname: '',
        pcbFilename: '',
        pcbFilefullname: '',
        craftFilename: '',
        craftFilefullname: '',
        ismakeTool: '是',
        makeSteelMesh: '1',
        makeDip: '1',
        makeTest: '1',
        makeDefense: '1',
        makeAging: '1',
        technicsState: 20,
        creator: '',
        creatorShow: '',
        creationtime: parseTime(new Date()),
        modifier: '',
        modifierShow: '',
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        materielPoList: [],
      }
      this.BOMFileList = []
      this.BOMFile = null
      this.PCBFileList = []
      this.PCBFile = null
      this.GONGYIFileList = []
      this.GONGYIFile = null
    }
  }
}
</script>

<style>

</style>
