<template>
  <div class="sk-select" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <div class="select-input" @click="toggleDropdown">
      <div class="selected-value">
        {{ selectedLabel || placeholder }}
      </div>
      <div class="select-arrow">▼</div>
    </div>
    
    <transition name="dropdown">
      <div class="select-dropdown" v-if="isOpen">
        <div 
          v-for="option in options" 
          :key="option.value"
          class="select-option"
          :class="{ 'is-selected': option.value === modelValue }"
          @click="handleSelect(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SkSelect',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isOpen = ref(false)

    const selectedLabel = computed(() => {
      const selected = props.options.find(opt => opt.value === props.modelValue)
      return selected ? selected.label : ''
    })

    const toggleDropdown = () => {
      if (!props.disabled) {
        isOpen.value = !isOpen.value
      }
    }

    const handleSelect = (option) => {
      emit('update:modelValue', option.value)
      emit('change', option.value)
      isOpen.value = false
    }

    // 点击外部关闭下拉框
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sk-select')) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isOpen,
      selectedLabel,
      toggleDropdown,
      handleSelect
    }
  }
}
</script>

<style scoped lang="scss">
.sk-select {
  position: relative;
  width: 100%;
  
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    .select-input {
      pointer-events: none;
    }
  }
}

.select-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #c0c4cc;
  }
}

.select-arrow {
  font-size: 12px;
  color: #c0c4cc;
  transition: transform 0.3s;
  
  .is-open & {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  padding: 8px 12px;
  cursor: pointer;
  
  &:hover {
    background: #f5f7fa;
  }
  
  &.is-selected {
    color: $primary-color;
    font-weight: bold;
  }
}

// 下拉动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top center;
}
</style>
