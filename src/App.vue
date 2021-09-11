<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              "
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="toggleMobileMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                :class="{
                  hidden: mobileMenuVisible,
                  block: !mobileMenuVisible,
                }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{
                  hidden: !mobileMenuVisible,
                  block: mobileMenuVisible,
                }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="
              flex-1 flex
              items-center
              justify-center
              sm:items-stretch sm:justify-start
            "
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                class="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <span class="ml-4 text-2xl font-bold text-white">Etherli</span>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link :to="{ name: 'home' }" class="router-link--sm"
                  >Home</router-link
                >
                <router-link :to="{ name: 'accounts' }" class="router-link--sm"
                  >Accounts</router-link
                >
                <router-link :to="{ name: 'about' }" class="router-link--sm"
                  >About</router-link
                >
              </div>
            </div>
          </div>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static sm:inset-auto sm:ml-6 sm:pr-0
            "
          ></div>
        </div>
      </div>

      <div v-if="mobileMenuVisible" id="mobile-menu" class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link :to="{ name: 'home' }" class="router-link--mobile"
            >Home</router-link
          >
          <router-link :to="{ name: 'accounts' }" class="router-link--mobile"
            >Accounts</router-link
          >
          <router-link :to="{ name: 'about' }" class="router-link--mobile"
            >About</router-link
          >
        </div>
      </div>
    </nav>

    <div class="max-w-screen-sm m-auto px-4 sm:px-0 pt-10">
      <router-view v-slot="{ Component, route }">
        <transition
          name="fade"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          mode="out-in"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuVisible: false,
    };
  },
  watch: {
    $route() {
      this.mobileMenuVisible = false;
    },
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
  },
};
</script>
