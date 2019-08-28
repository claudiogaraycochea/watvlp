import { connect } from 'react-redux';

import { addContractor, searchContractor } from '../../../../../store/project/ProjectActions';

import AddContractorModal from './AddContractorModal';

const mapStateToProps = (state) => {
	return {
		contractorList: state.default.project.contractorList,
		assignee: state.default.project.assignee,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addContractor: (project_id, task_id, assignee) => {
			dispatch(addContractor(project_id, task_id, assignee));
		},
		searchContractor: (contractor) => {
			dispatch(searchContractor(contractor));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContractorModal);
