<template>
    <div>
        <label class="sr-only">{{ label }}</label>
        <div class="flex mt-1 rounded-md shadow-sm">
            <span v-if="prepend" class="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                {{ prepend }}
            </span>
            <template v-if="type === 'textarea'">
                <textarea
                    :value="props.modelValue"  
                    @input="updateValue"                 
                    :required="required"
                    :name="name"               
                    :class="inputClasses"
                    :placeholder="label"
                ></textarea>
            </template>
            <template v-else-if="type === 'file'">
                <input
                    :type="type"
                    :required="required"
                    :name="name"
                    :class="inputClasses"
                    :placeholder="label"
                    @change="handleFileChange"
                />
            </template>
            <template v-else>
                <input
                    :type="type"
                    :required="required"
                    :name="name"
                    :class="inputClasses"
                    :placeholder="label"
                    :value="props.modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    step="0.01"
                />
            </template>
            <span v-if="append" class="inline-flex items-center px-3 text-sm text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50">
                {{ append }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: [String, Number, File],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  name: String,
  prepend: {
    type: String,
    default: ''
  },
  append: {
    type: String,
    default: ''
  },
  required: Boolean,
});

const inputClasses = computed(() => {
    const cls = [
        'border border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm px-3 py-2',
        'block w-full sm:text-sm placehoder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
    ];

    if(props.append && !props.prepend){
        cls.push('rounded-l-md');
    } else if(props.prepend && !props.append){
        cls.push('rounded-r-md');
    } else if(props.prepend && props.append){
        cls.push('rounded-none');
    }

    return cls.join(' ');
});

const emit = defineEmits(['update:modelValue', 'change']);

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        emit('update:modelValue', file);
    }
}

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>