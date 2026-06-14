const getUser = async (req, res) => {
     const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id)}
     });

     res.json(user);
};

module.exports = { getUser };