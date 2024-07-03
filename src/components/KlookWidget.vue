<template>
    <div ref="widgetContainer"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const props = defineProps({
    adid: String,
    tid: String,
    amount: String
  })

  // Define the ref outside the onMounted hook
  const widgetContainer = ref(null);
  
  onMounted(() => {
    // Create the <ins> element
    const ins = document.createElement('ins');
    ins.className = 'klk-aff-widget';
    ins.setAttribute('data-adid', props.adid);
    ins.setAttribute('data-lang', 'zh-HK');
    ins.setAttribute('data-currency', 'HKD');
    ins.setAttribute('data-cardH', '126');
    ins.setAttribute('data-padding', '92');
    ins.setAttribute('data-lgH', '470');
    ins.setAttribute('data-edgeValue', '655');
    ins.setAttribute('data-cid', '28');
    ins.setAttribute('data-tid', props.tid);
    ins.setAttribute('data-amount', props.amount);
    ins.setAttribute('data-prod', 'dynamic_widget');
    
    // Create the <a> element inside the <ins>
    const a = document.createElement('a');
    a.href = '//www.klook.com/';
    a.textContent = 'Klook.com';
    ins.appendChild(a);
    
    // Append the <ins> to the container
    widgetContainer.value.appendChild(ins);
    
    // Create and append the script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://affiliate.klook.com/widget/fetch-iframe-init.js';
    widgetContainer.value.appendChild(script);
  });
  </script>
  
  <style scoped>
  /* Add any styles you need for the widget here */
  </style>