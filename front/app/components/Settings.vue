<template>
  <div class='container'>
    <div class='panel panel-default'>
      <div class='panel-heading'>
        <h3 class='panel-title'>Settings</h3>
      </div>
      <div class='panel-body'>
        <settings-notifications></settings-notifications>
        <hr/>
        <settings-contact></settings-contact>
        <hr/>
        <settings-password></settings-password>
      </div>
    </div>
  </div>
</template>

<script>
  import SettingsContact from './SettingsContact';
  import SettingsPassword from './SettingsPassword';
  import SettingsNotifications from './SettingsNotifications';

  export default {
    name: 'settings',
    components: {
      'settings-password': SettingsPassword,
      'settings-contact': SettingsContact,
      'settings-notifications': SettingsNotifications
    }
  }
</script>