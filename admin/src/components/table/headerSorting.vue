<template>

    <th @click="$emit('click', field)" class="p-2 text-left bg-gray-100 border-b-2 cursor-pointer"
        :class="field === sortField ? 'bg-blue-50' : ''"
    >
        <div class="flex">
            <slot></slot>
            <div v-if="sortField === field" class="ml-2">
                <ChevronUpIcon v-if="sortDirection === 'asc'" class="w-4 h-4 mt-1 text-blue-500 transform " />
                <ChevronDownIcon v-else class="w-4 h-4 mt-1 text-blue-500" />
               
            </div>
            
        </div>
    </th>
</template>

<script setup>
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/vue/24/solid'

const props = defineProps({
    field: String,
    sortField: String,
    sortDirection: String
})

const $emit = defineEmits(['click']);
</script>