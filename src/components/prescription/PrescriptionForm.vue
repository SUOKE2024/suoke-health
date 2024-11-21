<template>
  <div class="prescription-form">
    <el-form 
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 处方类型 -->
      <el-form-item label="处方类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="PrescriptionType.Classical">经方</el-radio>
          <el-radio :label="PrescriptionType.Patent">成方</el-radio>
          <el-radio :label="PrescriptionType.Custom">自拟方</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 患者信息 -->
      <div class="section-title">患者信息</div>
      <el-form-item label="姓名" prop="patientName">
        <el-input v-model="form.patientName" />
      </el-form-item>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="patientGender">
            <el-select v-model="form.patientGender">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="patientAge">
            <el-input-number v-model="form.patientAge" :min="0" :max="150" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 四诊信息 -->
      <div class="section-title">四诊信息</div>
      <el-form-item label="望诊" prop="observation">
        <el-input 
          v-model="form.observation"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      
      <el-form-item label="闻诊" prop="auscultation">
        <el-input 
          v-model="form.auscultation"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      
      <el-form-item label="问诊" prop="interrogation">
        <el-input 
          v-model="form.interrogation"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      
      <el-form-item label="切诊" prop="palpation">
        <el-input 
          v-model="form.palpation"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <!-- 诊断信息 -->
      <div class="section-title">诊断信息</div>
      <el-form-item label="病因病机" prop="pathogenesis">
        <el-input 
          v-model="form.pathogenesis"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      
      <el-form-item label="证型" prop="syndrome">
        <el-select
          v-model="form.syndrome"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入证型"
        >
          <el-option
            v-for="item in syndromeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="治法" prop="treatment">
        <el-input 
          v-model="form.treatment"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <!-- 方剂信息 -->
      <div class="section-title">方剂信息</div>
      
      <!-- 经方/成方选择 -->
      <template v-if="form.type !== PrescriptionType.Custom">
        <el-form-item label="选择方剂" prop="classicalFormula">
          <el-select
            v-model="form.classicalFormula"
            filterable
            remote
            :remote-method="searchClassicalFormula"
            placeholder="请输入方剂名称搜索"
          >
            <el-option
              v-for="item in classicalFormulaOptions"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
              <div class="formula-option">
                <div class="name">{{ item.name }}</div>
                <div class="source">{{ item.source }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        
        <!-- 显示选中的经方/成方信息 -->
        <div v-if="form.classicalFormula" class="classical-formula-info">
          <div class="source">出处：{{ form.classicalFormula.source }}</div>
          <div class="description">方义：{{ form.classicalFormula.description }}</div>
          <div class="indication">主治：{{ form.classicalFormula.indication }}</div>
        </div>
      </template>

      <!-- 药物清单 -->
      <el-form-item label="药物组成" prop="herbs">
        <div class="herbs-list">
          <div 
            v-for="(herb, index) in form.herbs"
            :key="index"
            class="herb-item"
          >
            <el-select
              v-model="herb.name"
              filterable
              remote
              :remote-method="searchHerbs"
              placeholder="药名"
              @change="handleHerbSelect($event, index)"
            >
              <el-option
                v-for="item in herbOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
                <div class="herb-option">
                  <span>{{ item.name }}</span>
                  <span class="properties">{{ item.properties }}</span>
                </div>
              </el-option>
            </el-select>
            
            <el-input-number
              v-model="herb.dose"
              :min="0"
              :precision="1"
              :step="0.5"
            />
            
            <el-select v-model="herb.unit" placeholder="单位">
              <el-option label="克" value="克" />
              <el-option label="钱" value="钱" />
            </el-select>
            
            <el-input
              v-model="herb.notes"
              placeholder="备注"
            />
            
            <el-checkbox v-model="herb.isDecocted">代煎</el-checkbox>
            
            <el-button 
              type="danger" 
              icon="el-icon-delete"
              circle
              @click="removeHerb(index)"
            />
          </div>
          
          <el-button 
            type="primary"
            icon="el-icon-plus"
            @click="addHerb"
          >
            添加药物
          </el-button>
        </div>
      </el-form-item>

      <!-- 煎煮方法 -->
      <el-form-item label="煎煮方法" prop="decoctionMethod">
        <el-input
          v-model="form.decoctionMethod"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <!-- 服用方法 -->
      <el-form-item label="服用方法" prop="usageMethod">
        <el-input
          v-model="form.usageMethod"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <!-- 食疗建议 -->
      <div class="section-title">食疗建议</div>
      <el-form-item label="宜食" prop="dietaryAdvice.suitable">
        <el-select
          v-model="form.dietaryAdvice.suitable"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入宜食食物"
        >
          <el-option
            v-for="item in suitableFoodOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="忌食" prop="dietaryAdvice.unsuitable">
        <el-select
          v-model="form.dietaryAdvice.unsuitable"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入忌食食物"
        >
          <el-option
            v-for="item in unsuitableFoodOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 备注 -->
      <el-form-item label="备注" prop="notes">
        <el-input
          v-model="form.notes"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="form-actions">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleSaveDraft">保存草稿</el-button>
      <el-button type="primary" @click="handleSubmit">提交审核</el-button>
    </div>

    <!-- 配伍检查结果弹窗 -->
    <el-dialog
      v-model="showCompatibilityCheck"
      title="配伍检查结果"
      width="50%"
    >
      <div class="compatibility-result">
        <template v-if="compatibilityIssues.length">
          <div class="warning">
            <i class="el-icon-warning" />
            发现以下配伍问题：
          </div>
          <div 
            v-for="(issue, index) in compatibilityIssues"
            :key="index"
            class="issue-item"
          >
            <div class="issue-type">{{ issue.type }}</div>
            <div class="issue-desc">{{ issue.description }}</div>
            <div class="issue-suggestion">建议：{{ issue.suggestion }}</div>
          </div>
        </template>
        <template v-else>
          <div class="success">
            <i class="el-icon-success" />
            未发现配伍禁忌
          </div>
        </template>
      </div>
      <template #footer>
        <el-button @click="showCompatibilityCheck = false">关闭</el-button>
        <el-button 
          type="primary"
          @click="handleConfirmSubmit"
          :disabled="hasSerousIssues"
        >
          确认提交
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { PrescriptionType, type Prescription } from '@/types/prescription'
import { 
  searchClassicalFormulas,
  searchHerbMedicines,
  checkCompatibility,
  savePrescription
} from '@/api/prescription'

export default defineComponent({
  name: 'PrescriptionForm',
  props: {
    initialData: {
      type: Object as PropType<Partial<Prescription>>,
      default: () => ({})
    }
  },
  emits: ['cancel', 'save', 'submit'],
  setup(props, { emit }) {
    // 表单数据
    const form = reactive<Partial<Prescription>>({
      type: PrescriptionType.Custom,
      herbs: [],
      dietaryAdvice: {
        suitable: [],
        unsuitable: []
      },
      ...props.initialData
    })

    // 表单校验规则
    const rules = {
      // ... 表单验证规则
    }

    // 参考数据
    const syndromeOptions = ref([])
    const classicalFormulaOptions = ref([])
    const herbOptions = ref([])
    const suitableFoodOptions = ref([])
    const unsuitableFoodOptions = ref([])

    // 配伍检查
    const showCompatibilityCheck = ref(false)
    const compatibilityIssues = ref([])
    const hasSerousIssues = computed(() => {
      return compatibilityIssues.value.some(issue => issue.type === 'serious')
    })

    // 搜索经方/成方
    const searchClassicalFormula = async (query: string) => {
      if (query) {
        const data = await searchClassicalFormulas(query)
        classicalFormulaOptions.value = data
      } else {
        classicalFormulaOptions.value = []
      }
    }

    // 搜索中药
    const searchHerbs = async (query: string) => {
      if (query) {
        const data = await searchHerbMedicines(query)
        herbOptions.value = data
      } else {
        herbOptions.value = []
      }
    }

    // 添加药物
    const addHerb = () => {
      form.herbs.push({
        name: '',
        dose: 0,
        unit: '克',
        isDecocted: true
      })
    }

    // 删除药物
    const removeHerb = (index: number) => {
      form.herbs.splice(index, 1)
    }

    // 选择药物时自动填充性味归经
    const handleHerbSelect = (herbName: string, index: number) => {
      const herb = herbOptions.value.find(h => h.name === herbName)
      if (herb) {
        form.herbs[index] = {
          ...form.herbs[index],
          properties: herb.properties
        }
      }
    }

    // 保存草稿
    const handleSaveDraft = async () => {
      try {
        const data = await savePrescription({
          ...form,
          status: 'draft'
        })
        ElMessage.success('保存成功')
        emit('save', data)
      } catch (error) {
        ElMessage.error('保存失败')
      }
    }

    // 提交处方
    const handleSubmit = async () => {
      // 表单验证
      await formRef.value.validate()
      
      // 配伍检查
      const issues = await checkCompatibility(form.herbs)
      compatibilityIssues.value = issues
      showCompatibilityCheck.value = true
    }

    // 确认提交
    const handleConfirmSubmit = async () => {
      try {
        const data = await savePrescription({
          ...form,
          status: 'pending_review'
        })
        ElMessage.success('提交成功')
        emit('submit', data)
      } catch (error) {
        ElMessage.error('提交失败')
      }
    }

    return {
      form,
      rules,
      PrescriptionType,
      syndromeOptions,
      classicalFormulaOptions,
      herbOptions,
      suitableFoodOptions,
      unsuitableFoodOptions,
      showCompatibilityCheck,
      compatibilityIssues,
      hasSerousIssues,
      searchClassicalFormula,
      searchHerbs,
      addHerb,
      removeHerb,
      handleHerbSelect,
      handleSaveDraft,
      handleSubmit,
      handleConfirmSubmit,
      handleCancel: () => emit('cancel')
    }
  }
})
</script>

<style lang="scss" scoped>
.prescription-form {
  padding: 20px;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0 10px;
    padding-left: 10px;
    border-left: 4px solid $primary-color;
  }

  .herbs-list {
    .herb-item {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;

      .el-select {
        width: 200px;
      }

      .el-input-number {
        width: 100px;
      }
    }
  }

  .classical-formula-info {
    margin: 10px 0;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;

    > div {
      margin-bottom: 5px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .form-actions {
    margin-top: 30px;
    text-align: center;
  }
}

.compatibility-result {
  .warning {
    color: $warning-color;
    margin-bottom: 15px;
    
    .el-icon-warning {
      margin-right: 5px;
    }
  }

  .success {
    color: $success-color;
    text-align: center;
    
    .el-icon-success {
      margin-right: 5px;
    }
  }

  .issue-item {
    margin-bottom: 15px;
    padding: 10px;
    background: #fff9f9;
    border-radius: 4px;

    .issue-type {
      color: $danger-color;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .issue-suggestion {
      color: $primary-color;
      margin-top: 5px;
    }
  }
}

.herb-option {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .properties {
    color: #999;
    font-size: 12px;
  }
}

.formula-option {
  .source {
    font-size: 12px;
    color: #999;
  }
}
</style>
