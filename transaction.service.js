const transactionService = {
    findByUser: (user) => {
        return firebase
            .firestore()
            .collection("trans")
            .where("user.uid", "==", user.uid)
            .orderBy("date", "desc")
            .get()
            .then((snapshot) => {
                return snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    uid: doc.id,
                }));
            });
    },

    findByUid: (uid) => {
        if (!uid) return Promise.reject(new Error("UID é obrigatório"));

        return firebase
            .firestore()
            .collection("trans")
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return {
                        ...doc.data(),
                        uid: doc.id
                    };
                }
                return null;
            });
    },

    save: (transaction) => {
        return firebase.firestore()
            .collection("trans")
            .add({
                ...transaction,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    },

    update: (uid, transaction) => {
        if (!uid) return Promise.reject(new Error("UID da transação é obrigatório"));
        if (!transaction) return Promise.reject(new Error("Dados da transação são obrigatórios"));

        return firebase
            .firestore()
            .collection("trans")
            .doc(uid)
            .update({
                ...transaction,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    },

    remove: (uid) => {
        if (!uid) return Promise.reject(new Error("UID é obrigatório"));
        
        return firebase.firestore()
            .collection("trans")
            .doc(uid)
            .delete();
    }
};