<template>
  <q-page class="flex justify-center">
    <div v-if="loading">loading....</div>
    <div
      v-else-if="
        res && res?.data != undefined && res.data != null
      "
      class="q-pa-md flex justify-center"
    >
      <q-form
        class="column"
        style="min-width: 400px"
        @submit.prevent="onSubmit"
      >
        <q-input
          :readonly="true"
          v-model="res.data.content"
          filled
          type="textarea"
          class="q-mb-md"
        />
        <div class="q-mb-md flex justify-between">
          <p class="q-mt-md">Status naročila:</p>
          <q-select v-model="status" :options="Status" />
        </div>
        <q-btn type="submit" label="Sprejmi" />
      </q-form>
    </div>
    <p class="text-red-10">{{ err }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useApi from '../helpers/useApi';
import Order from '../models/Order.interface';
import Status from '../models/Status';

export default defineComponent({
  name: 'EditOrder',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const [res, err, apiFetch, loading] = useApi<Order>();

    const status = ref<string>(
      Status[res.value?.data.status || 0]
    );

    apiFetch({ method: 'GET', url: 'orders/' + props.id });

    watch(res, () => {
      if (res.value?.data)
        status.value = Status[res.value.data.status];
    });

    return {
      loading,
      err,
      apiFetch,
      Status,
      status,
      res,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.res?.data != undefined &&
        this.res.data != null
      ) {
        this.apiFetch({
          method: 'PATCH',
          url: 'orders/' + this.res?.data.id,
          data: {
            status: this.Status.indexOf(this.status),
          },
        });
        this.$router.push('/');
      }
    },
  },
});
</script>
