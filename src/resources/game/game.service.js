export default (gameRepository) => ({
  getAll: async (owner_id) => gameRepository.getAll(owner_id),

  getById: async (owner_id, id) => gameRepository.getById(owner_id, id),

  create: async (props) => gameRepository.create(props),

  update: async (props) => gameRepository.update(props),

  remove: async (owner_id, id) => gameRepository.remove(owner_id, id),
});
