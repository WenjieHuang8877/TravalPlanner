package backend

import (
	"errors"
	"fmt"
	"travel-planner/model"
)

func (backend *MySQLBackend) SaveVacationPlanToSQL(plan model.Plan) error {
	fmt.Println("Saving new plan to SQL")
	result := backend.db.Table("Plans").Create(&plan)
	if result.Error != nil || result.RowsAffected == 0 {
		fmt.Printf("Faild to save plan %v\n", plan.Id)
	}
	return nil
}

func (backend *MySQLBackend) SavePlanInfoToSQL(planInfo model.SavePlanRequestBody) error {
	var count = 0
	for _, activity := range planInfo.ActivityInfoList {
		result := backend.db.Table("Activities").Create(&activity)
		if result.Error != nil || result.RowsAffected == 0 {
			fmt.Printf("Faild to save activities %v\n", activity.Id)
		}
		count++
	}

	if count == 0 {
		return errors.New("failed to save all the activities info")
	}

	for _, transportaion := range planInfo.TransportationInfoList {
		result := backend.db.Table("Transportations").Create(&transportaion)
		if result.Error != nil || result.RowsAffected == 0 {
			fmt.Printf("Faild to save activities %v\n", transportaion.Id)
		}
		count++
	}

	if count == 0 {
		return errors.New("failed to save all the activities info")
	}
	return nil
}

func (backend *MySQLBackend) GetPlanFromVacationId(vacationId uint32) ([]model.Plan, error) {
	var plans []model.Plan
	result := backend.db.Table("Plans").Where("vacation_id = ?", vacationId).Find(&plans)
	fmt.Print(plans, result)
	if result.Error != nil {
		return nil, result.Error
	}
	return plans, nil
}
