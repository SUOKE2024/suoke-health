<template>
  <div class="sk-input" :class="{ 'is-disabled': disabled }">
    <div class="input-prefix" v-if="$slots.prefix || prefixIcon">
      <span class="prefix-icon" v-if="prefixIcon">{{ prefixIcon }}</span>
      <slot name="prefix"></slot>
    </div>
    
    <input
      ref="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    
    <div class="input-suffix" v-if="$slots.suffix || suffixIcon || clearable">
      <span 
        class="clear-icon" 
        v-if="clearable && modelValue" 
        @click="handleClear"
      >✕</span>
      <span class="suffix-icon" v-if="suffixIcon">{{ suffixIcon }}</span>
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
  setup(props, { emit }) {
    const handleInput = (event) => {
      const value = event.target.value
      emit('update:modelValue', value)
      emit('input', value)
    }

    const handleChange = (event) => {
      emit('change', event.target.value)
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    const handleClear = () => {
      emit('update:modelValue', '')
      emit('clear')
    }

    return {
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear
    }
  }
}
</script>

<style scoped lang="scss">
.sk-input {
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: relative;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: #c0c4cc;
  }

  &:focus-within {
    border-color: $primary-color;
  }

  &.is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    cursor: not-allowed;

    input {
      cursor: not-allowed;
    }
  }

  input {
    flex: 1;
    width: 100%;
    height: 32px;
    padding: 0 12px;
    border: none;
    background: none;
    outline: none;
    color: #606266;

    &::placeholder {
      color: #c0c4cc;
    }
  }

  .input-prefix,
  .input-suffix {
    display: flex;
    align-items: center;
    padding: 0 8px;
    color: #909399;
  }

  .clear-icon {
    cursor: pointer;
    color: #c0c4cc;
    
    &:hover {
      color: #909399;
    }
  }
}
</style>
