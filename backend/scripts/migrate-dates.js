const { connectToDatabase } = require('../db/mongodb');

async function migrateDates() {
    try {
        console.log('Starting migration...');
        const db = await connectToDatabase();

        // Update Documents collection
        const docsResult = await db.collection('Documents').updateMany(
            { createdAt: { $exists: false } },
            { $set: { createdAt: new Date() } }
        );
        console.log(`Updated ${docsResult.modifiedCount} documents in Documents collection`);

        // Update StudyGuides collection
        const guidesResult = await db.collection('StudyGuides').updateMany(
            { createdAt: { $exists: false } },
            { $set: { createdAt: new Date() } }
        );
        console.log(`Updated ${guidesResult.modifiedCount} documents in StudyGuides collection`);

        // Update Chat_History collection messages
        const chatsResult = await db.collection('Chat_History').updateMany(
            { "messages.createdAt": { $exists: false } },
            { $set: { "messages.$[].createdAt": new Date() } }
        );
        console.log(`Updated ${chatsResult.modifiedCount} documents in Chat_History collection`);

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateDates();