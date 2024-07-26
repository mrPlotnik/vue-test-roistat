<template>
  <div class="table__row">

    <!-- Родительский контакт -->
    <div class="table__main" >

      <!-- Имя -->
      <div class="table__name" >

        <!-- Кнопка -->
        <button
          v-if="contact.children !== undefined && contact.children.length !== 0"
          class="btn table__toggle-btn"
          @click="toggleOpen"
          :style="{ left: `${indent}px` }"
        >
          {{ isOpen ? '−' : '+' }}
        </button>

        <span :style="{ marginLeft: `${indent + 25}px` }">
          {{ contact.name }}
        </span>

      </div>

      <!-- Телефон -->
      <div class="table__phone">
        <span>
          {{ contact.phone }}
        </span>
      </div>

    </div>

    <div v-if="isOpen" class="table__row">
      <TableRow
        v-for="child in contact.children"
        :key="child.phone"
        :contact="child"
        :indent="indent + 25"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Contact } from '@/types';

// Входные параметры
defineProps<{
  contact: Contact;
  indent: number;
}>();

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped lang="scss">
.table {
  &__row {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }
  &__main {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    margin-bottom: 5px;
  }
  &__name {
    position: relative;
    display: flex;
    flex-grow: 1;
    span {
      width: 100%;
      padding: .5em .25em;
      border-top-left-radius: .25em;
      border-bottom-left-radius: .25em;
      line-height: 20px;
      background-color: #ddd;
    }
  }
  &__phone {
    display: flex;
    align-items: center;
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 1;
    span {
      width: 100%;
      padding: .5em .25em;
      border-top-right-radius: .25em;
      border-bottom-right-radius: .25em;
      line-height: 20px;
      background-color: #ddd;
    }
  }
  &__toggle-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7px;
    width: 20px;
    height: 20px;
    border-radius: .25em;
    &:hover {
      background-color: #ddd;
    }
  }
}
</style>
