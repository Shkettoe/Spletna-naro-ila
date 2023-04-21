<template>
  <q-page class="flex justify-center">
    <p class="text-red-10 text-h4">{{ err }}</p>
    <div v-if="loading">loading....</div>
    <q-list v-else-if="res">
      <Item
        v-for="item in res.data"
        :content="item.content"
        :status="Status[item.status]"
        :id="item.id"
        :key="item.id"
        :item="item"
      />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import Order from '../models/Order.interface';
import useApi from '../helpers/useApi';
import { defineComponent } from 'vue';
import Item from '../components/Item.vue';
import Status from '../models/Status';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const [res, err, apiFetch, loading] = useApi<Order[]>();

    apiFetch({ method: 'GET', url: 'orders' });

    return { loading, err, res, Status };
  },
  components: { Item },
});
</script>
