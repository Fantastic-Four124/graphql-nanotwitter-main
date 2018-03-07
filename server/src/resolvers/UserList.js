function users(parent, args, context, info) {
  const { userIds } = parent
  return context.db.query.users({ where: { id_in: userIds } }, info)
}

module.exports = {
  users,
}
