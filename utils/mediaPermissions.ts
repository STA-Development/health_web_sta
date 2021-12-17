export const checkMediaDevicePermissions = async () => {
  const cameraPermissions = await navigator.permissions.query(<PermissionDescriptor><unknown>{name: "camera"})
  const microphonePermissions = await navigator.permissions.query(<PermissionDescriptor><unknown>{name: "microphone"})
  return cameraPermissions.state === 'granted' && microphonePermissions.state === 'granted'
}
