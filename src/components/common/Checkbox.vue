<template>
  <label 
    class="sk-checkbox" 
    :class="{
      'is-checked': isChecked,
      'is-disabled': disabled,
      'is-indeterminate': indeterminate
    }"
  >
    <span class="checkbox-input">
      <input
        type="checkbox"
        :value="label"
        :checked="isChecked"
        :disabled="disabled"
        @change="handleChange"
      >
      <span class="checkbox-inner"></span>
    </span>
    <span class="checkbox-label" v-if="$slots.default">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SkCheckbox',
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.label)
      }
      return props.modelValue
    })

    const handleChange = (event) => {
      if (props.disabled) return
      
      const checked = event.target.checked
      let newValue

      if (Array.isArray(props.modelValue)) {
        newValue = checked
          ? [...props.modelValue, props.label]
          : props.modelValue.filter(item => item !== props.label)
      } else {
        newValue = checked
      }

      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    return {
      isChecked,
      handleChange
    }
  }
}
</script>

<style scoped lang="scss">
.sk-checkbox {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  margin-right: 30px;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.checkbox-input {
  position: relative;
  display: inline-block;
  
  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .checkbox-inner {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    background-color: white;
    transition: all .3s;
    
    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 5px;
      width: 3px;
      height: 7px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) scale(0);
      transition: transform .2s;
    }
  }
}

.checkbox-label {
  padding-left: 8px;
  line-height: 1;
}

// 选中状态
.is-checked {
  .checkbox-inner {
    background-color: $primary-color;
    border-color: $primary-color;
    
    &::after {
      transform: rotate(45deg) scale(1);
    }
  }
}

// 半选状态
.is-indeterminate {
  .checkbox-inner {
    background-color: $primary-color;
    border-color: $primary-color;
    
    &::after {
      content: "";
      position: absolute;
      top: 7px;
      left: 3px;
      width: 8px;
      height: 2px;
      background: white;
      transform: scale(1);
      border: none;
    }
  }
}
</style>
