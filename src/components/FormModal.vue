<template>
  <div
    class="modal__overlay"
    @click.self="closeModal"
    @keypress.self="closeModal"
  >
    <div class="modal__content">

      <h2 class="modal-title">Добавить контакт</h2>

      <button
        class="btn btn--close"
        @click="closeModal"
      >×</button>

      <form
        class="modal__form"
        @submit.prevent="submitForm"
      >

        <div class="modal__label-wrap">
          <label for="name">
            <span>Имя</span>
            <input
              id="name"
              v-model="form.name"
              required
            />
          </label>

          <label for="phone">
            <span>Телефон</span>
            <input
              id="phone"
              v-model="form.phone"
              required
            />
          </label>

          <label for="parent">
            <span>Родитель</span>
            <select
              id="parent"
              v-model="form.parentPhone"
            >
              <option value="">Нет родителя</option>
              <option
                v-for="name in props.names"
                :key="name.phone"
                :value="name.phone"
              >
                {{ name.name }} {{ name.phone }}
              </option>
            </select>
          </label>
        </div>

        <button
          class="btn btn--primary"
          type="submit"
        >Сохранить</button>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Contact } from '@/types';

const props = defineProps<{
  names: { name: string; phone: string }[];
}>();

const emit = defineEmits<{(e: 'contactAdded', contact: Contact): void; (e: 'closeModal'): void; }>();

const form = ref({
  name: '',
  phone: '',
  parentPhone: '',
});

const submitForm = () => {
  const newContact: Contact = {
    name: form.value.name,
    phone: form.value.phone,
    parentPhone: form.value.parentPhone,
    children: [],
  };
  emit('contactAdded', newContact);
};

const closeModal = () => {
  emit('closeModal');
};
</script>

<style scoped lang="scss">
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.5em;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    min-width: 320;
    padding: 20px;
    border-radius: 8px;
    background: #fff;
  }
  &__title {
    margin: 0;
    margin-bottom: 1em;
  }
  // &-form {}
  &__label-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    label {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 1em;
      margin-bottom: .5em;
      span {
        position: absolute;
        top: -1.15em;
        font-size: 0.85em;
      }
      input, select {
        width: 100%;
      }
    }
  }
}
.btn--close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
