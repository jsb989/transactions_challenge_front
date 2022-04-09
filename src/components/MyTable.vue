<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg"
    :class="[color === 'light' ? 'bg-white' : 'bg-azul text-white']"
  >
    <div class="block w-full overflow-x-auto rounded-blr-lg">
      <table class="items-center w-full bg-transparent">
        <thead class="">
          <tr class="">
            <th
              v-for="field in fields"
              :key="field.key"
              class="sticky px-3 align-middle py-3 text-sm uppercase whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-azul border-2 border-white'
                  : 'bg-blue-800 text-blue-300 border-blue-700',
              ]"
            >
              <span span :class="[color === 'light' ? 'text-azul' : 'text-white']">
                <slot :name="`head(${field.key})`" :item="field">
                  {{ field.label }}
                </slot>
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="border-2 border-white">
          <tr v-for="(item, i) in data" :key="i">
            <td
              v-for="(field, j) in fields"
              :key="j"
              class="text-xs whitespace-nowrap px-3 py-3"
              :class="
                stripped && i % 2 === 1 ? (color === 'light' ? 'bg-gray-100' : 'bg-blue-800') : ''
              "
            >
              <div class="ml-2" :class="[color === 'light' ? 'text-black' : 'text-white']">
                <div :class="field.align">
                  <slot :name="`cell(${field.key})`" :item="item" :row="i" :column="j">
                    {{
                      field.formater && item[field.key] != null
                        ? field.formater(item[field.key])
                        : item[field.key]
                    }}
                  </slot>
                </div>
              </div>
            </td>
          </tr>
          <!-- TODO botar isso centralizado no meio do tbody -->
          <div v-if="!data.length" class="flex text-center justify-center w-full">
            <slot name="noPageView" class="w-max">
              {{ emptyMessage }}
            </slot>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
    fields: {
      type: Array,
      required: true,
    },
    color: {
      default: 'light',
      validator(value: string) {
        // The value must match one of these strings
        return ['light', 'dark'].indexOf(value) !== -1
      },
    },
    stripped: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: 'Sem dados!',
    },
  },
})
</script>