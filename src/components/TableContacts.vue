<template>
  <div class="table">
    <div class="table__body">

      <!-- Заголовки таблицы -->
      <div class="table__header">
        <div
          class="table__header-name"
          @click="sortContactsByField('name')"
          @keypress="sortContactsByField('name')"
        >Имя</div>
        <div
          class="table__header-phone"
          @click="sortContactsByField('phone')"
          @keypress="sortContactsByField('phone')"
        >Телефон</div>
      </div>

      <TableRow
        v-for="contact in qwe"
        :key="contact.phone"
        :contact="contact"
        :indent="0"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, defineProps, reactive, computed,
} from 'vue';
import { Contact } from '@/types';
import TableRow from './TableRow.vue';

// Входные параметры
const props = defineProps<{ contacts: Contact[]; }>();

const currentContacts = computed(() => props.contacts);

const sortAZ = ref(0);
const qwe = reactive(currentContacts);

// Универсальная функция сравнения
const compare = (a: string, b: string) => {
  if (a < b) return sortAZ.value === 1 ? -1 : 1;
  if (a > b) return sortAZ.value === 0 ? 1 : -1;
  return 0;
};

// Универсальная функция сортировки
const sortContacts = (
  contactsForSorting: Contact[],
  field: keyof Contact,
): Contact[] => contactsForSorting
  .sort((a, b) => compare(a[field] as string, b[field] as string))
  .map((contact) => ({
    ...contact,
    children: sortContacts(contact.children, field),
  }));

const sortContactsByField = (field: keyof Contact) => {
  sortContacts(qwe.value, field);
};
</script>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: column;
  border-radius: .5em;
  background-color: #eee;
  &__body {
    padding: 5px;
    padding-bottom: 0;
  }
  &__header {
    display: flex;
    margin-bottom: 0.5em;
    padding: .5em;
    border-radius: .25em;
    font-weight: bold;
    background: #ddd;

    &-name {
      flex-grow: 1;
    }
    &-phone {
      flex-basis: 50%;
    }
    &-name,
    &-phone {
      transition: color, .2s ease;
      &:hover {
        cursor: pointer;
        color: rgb(0, 149, 207);
      }
    }
  }
}
</style>
