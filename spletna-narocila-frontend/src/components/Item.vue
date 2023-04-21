<template>
  <q-item>
    <div
      class="bg-accent q-pa-md rounded-borders flex column"
    >
      <code class="q-mb-md">{{ content }}</code>
      <div class="flex justify-between">
        <div>
          <q-badge color="teal" class="q-pa-sm">{{
            status
          }}</q-badge>
        </div>
        <router-link :to="'/edit/' + id">
          <q-btn icon="settings" />
        </router-link>
      </div>
    </div>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Item',
  props: {
    id: {
      type: Number,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
});
</script>
