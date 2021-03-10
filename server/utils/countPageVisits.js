
const checkIPAndUpdateViews = ( name, ip ) => {

    const blog = await prisma.blog.update( {
        where: { title: 'my cool blog' },
        data: {
            views: {
                upsert: {
                    create: { name: 'my cool blog' },
                    update: { name: 'my cool blog' },
                },
            }
        },
    } );

};

module.exports = {
    checkIPAndUpdateViews
};