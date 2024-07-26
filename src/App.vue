<template>
  <div class="container">

    <div class="btn-container">
      <button
        class="btn btn--primary"
        @click="showModal = true"
      >Добавить контакт</button>
    </div>

    <TableContacts
      :contacts="contacts"
    />

    <Transition>
      <FormModal
        v-if="showModal"
        :names="extractedNames"
        @contactAdded="contactAdded"
        @closeModal="showModal = false"
      />
    </Transition>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { Contact } from '@/types';
import TableContacts from '@/components/TableContacts.vue';
import FormModal from '@/components/FormModal.vue';

// Получаем данные о контактах из localStorage
const localStorageContacts = localStorage.getItem('contacts');
const localStorageContactsParsed = localStorageContacts
  ? JSON.parse(localStorageContacts) as Contact[]
  : [];

const contacts = reactive([...localStorageContactsParsed]);
const showModal = ref(false);

// Вставить новый контакт в иерархию (рекурсивно)
const setHierarchy = (newContact: Contact) => {
  // Функция для рекурсивного поиска родителя
  const addContactToHierarchy = (item: Contact[], contactToAdd: Contact): Contact[] => item
    .flatMap((contact) => {
      // Если контакт является родителем, добавляем новый контакт в его детей
      if (contact.phone === contactToAdd.parentPhone) {
        // Создаем новый объект контакта с обновленными детьми
        const updatedContact = { ...contact };
        updatedContact.children.push(contactToAdd);
        return [updatedContact];
      }
      // Если у контакта есть дети, рекурсивно ищем в их
      if (contact.children.length !== 0) {
        addContactToHierarchy(contact.children, contactToAdd);
      }
      return [contact];
    });

  // Запускаем
  return addContactToHierarchy(contacts, newContact);
};

// Добавить контакт
const addContact = (newContact: Contact) => {
  if (newContact.parentPhone) setHierarchy(newContact);
  else contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const contactAdded = (newContact: Contact) => {
  addContact(newContact);
  showModal.value = false;
};

// Получаем только имена с phone со всех уровней (рекурсивно)
const extractNames = (item: Contact | Contact[]): { name: string; phone: string }[] => {
  // Если item является массивом, рекурсивно обрабатываем каждый элемент массива
  if (Array.isArray(item)) {
    return item.flatMap(extractNames);
  }

  // Если item является объектом (и не null), извлекаем имена
  if (typeof item === 'object' && item !== null) {
    const namesAndPhones: { name: string; phone: string }[] = [];

    namesAndPhones.push({ name: item.name, phone: item.phone });

    return namesAndPhones.concat(
      Object.values(item).flatMap(extractNames),
    );
  }
  return [];
};

// Computed
const extractedNames = computed(() => extractNames(contacts));

</script>

<style lang="scss">
.btn-container {
  margin: 1em 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
