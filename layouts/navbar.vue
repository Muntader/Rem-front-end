<template>
  <div class="navbar">
    <div class="navbar__left">
      <div class="navbar__left--dropdown dropdown">
        <button type="button" @click="ActiveLeftDropdown = !ActiveLeftDropdown">
          <span class="icon">
            <img src="~/assets/icons/server.svg" alt="server" />
          </span>
          <span class="text">Aws server name</span>
          <i class="arrow" :class="{'down': ActiveLeftDropdown, 'up': !ActiveLeftDropdown}"></i>
        </button>
        <transition name="dropdown-ts">
          <div class="menu dw-blue" v-show="ActiveLeftDropdown">
            <ul>
              <li class="item">Server 2</li>
              <li class="item">Server 2</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="navbar__right">
      <div class="navbar__left--dropdown dropdown">
        <button type="button" @click="ActiveRightDropdown = !ActiveRightDropdown">
          <span class="icon">
            <img src="~/assets/icons/notify.svg" alt="server" />
          </span>
          <span class="notify-dot"></span>
        </button>
        <transition name="dropdown-ts">
          <div class="menu dw-light" v-show="ActiveRightDropdown">
            <ul>
              <li class="item">Server 2</li>
              <li class="item">Server 2</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ActiveLeftDropdown: false,
      ActiveRightDropdown: false
    };
  }
};
</script>
