export const checkMediaDevicePermissions = async () => {
  const cameraPermissions = await navigator.permissions.query({name: "camera"})
  const microphonePermissions = await navigator.permissions.query({name: "microphone"})
  return cameraPermissions.state === "granted" && microphonePermissions.state === "granted";
}