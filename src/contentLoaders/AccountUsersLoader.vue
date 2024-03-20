<template>
  <content-loader view-box="0 0 700 200" :speed="2" primary-color="#cbd5e0" secondary-color="#e2e8f0">
    <!-- First row -->
    <rect x="16" y="24" rx="4" ry="4" width="18" height="18" />
    <rect x="41" y="17" rx="16" ry="16" width="34" height="32" />
    <rect x="86" y="13" rx="4" ry="4" width="130" height="18" />
    <rect x="86" y="37" rx="4" ry="4" width="180" height="18" />
    <rect x="417" y="20" rx="4" ry="4" width="54" height="25" />

    <!-- Second row -->
    <rect x="16" y="94" rx="4" ry="4" width="18" height="18" />
    <rect x="41" y="87" rx="16" ry="16" width="34" height="32" />
    <rect x="86" y="83" rx="4" ry="4" width="130" height="18" />
    <rect x="86" y="107" rx="4" ry="4" width="180" height="18" />
    <rect x="417" y="90" rx="4" ry="4" width="54" height="25" />

    <!-- Third row -->
    <rect x="16" y="163" rx="4" ry="4" width="18" height="18" />
    <rect x="41" y="156" rx="16" ry="16" width="34" height="32" />
    <rect x="86" y="152" rx="4" ry="4" width="130" height="18" />
    <rect x="86" y="176" rx="4" ry="4" width="180" height="18" />
    <rect x="417" y="159" rx="4" ry="4" width="116" height="25" />
  </content-loader>
</template>

<script lang="ts" setup>
import { ContentLoader } from "vue-content-loader";
</script>
