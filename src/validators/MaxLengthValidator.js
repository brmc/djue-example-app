export default {
  invalidMessage: "You must provide your own logic for this validator",
  validate() {
    console.warn(this.invalidMessage)
    return [true, this.invalidMessage]
  },
}
