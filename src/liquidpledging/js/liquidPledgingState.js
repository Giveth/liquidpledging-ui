class LiquidPledgingState {
  constructor(liquidPledging) {
    this.$lp = liquidPledging;
  }

  $getPledge(idPledge) {
    const pledge = {
      delegates: [],
    };

    return this.$lp.getPledge(idPledge)
    .then((res) => {
      pledge.amount = res.amount;
      pledge.owner = res.owner;

      if (res.intendedProject) {
        pledge.intendedProject = res.intendedProject;
        pledge.commmitTime = res.commitTime;
      }
      if (res.oldPledge) {
        pledge.oldPledge = res.oldPledge;
      }
      if (res.paymentState === '0') {
        pledge.paymentState = 'Pledged';
      } else if (res.paymentState === '1') {
        pledge.paymentState = 'Paying';
      } else if (res.paymentState === '2') {
        pledge.paymentState = 'Paid';
      } else {
        pledge.paymentState = 'Unknown';
      }

      const promises = [];
      for (let i = 1; i <= res.nDelegates; i += 1) {
        promises.push(
          this.$lp.getPledgeDelegate(idPledge, i)
          .then(r => ({
            id: r.idDelegate,
            addr: r.addr,
            name: r.name,
            url: r.url,
          })),
          );
      }

      return Promise.all(promises);
    })
    .then((delegates) => {
      pledge.delegates = delegates;
      return pledge;
    });
  }

  $getAdmin(idAdmin) {
    const admin = {};
    return this.$lp.getPledgeAdmin(idAdmin)
    .then((res) => {
      if (res.adminType === '0') {
        admin.type = 'Giver';
      } else if (res.adminType === '1') {
        admin.type = 'Delegate';
      } else if (res.adminType === '2') {
        admin.type = 'Project';
      } else {
        admin.type = 'Unknown';
      }
      admin.addr = res.addr;
      admin.name = res.name;
      admin.url = res.url;
      admin.commitTime = res.commitTime;
      if (admin.paymentState === 'Project') {
        admin.parentProject = res.parentProject;
        admin.canceled = res.canceled;
      }
      admin.plugin = res.plugin;
      admin.canceled = res.canceled;
      return admin;
    });
  }

  getState() {
    const getPledges = () => this.$lp.numberOfPledges()
    .then((nPledges) => {
      const promises = [];
      for (let i = 1; i <= nPledges; i += 1) {
        promises.push(this.$getPledge(i));
      }
      return Promise.all(promises);
    });

    const getAdmins = () => this.$lp.numberOfPledgeAdmins()
    .then((nAdmins) => {
      const promises = [];
      for (let i = 1; i <= nAdmins; i += 1) {
        promises.push(this.$getAdmin(i));
      }

      return Promise.all(promises);
    });

    return Promise.all([getPledges(), getAdmins()])
    .then(([pledges, admins]) => ({
      pledges: [null, ...pledges],
      admins: [null, ...admins],
    }));
  }
}

module.exports = LiquidPledgingState;
