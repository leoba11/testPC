import { NextFunction, Request, Response } from 'express';
import ReportUser from '../models/reportUser';
import mongoose from 'mongoose';

const createReportUser = (req: Request, res: Response, next: NextFunction) => {
    let { username, promotionType, phoneNumber, date, hour } = req.body;

    const user = new ReportUser({
        _id: new mongoose.Types.ObjectId(),
        username,
        promotionType,
        phoneNumber,
        date,
        hour
    });
    
    return user.save()
        .then((result) => {
            return res.status(201).json({
                reportUser: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

const getAllReportUsers = (req: Request, res: Response, next: NextFunction) => {
    ReportUser.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                reporUsers: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

const deleteReportUser = (req: Request, res: Response, next: NextFunction) => {

    ReportUser.deleteOne({_id: req.params.id}).then( () => {
            res.status(200).json({
                message: 'Report User Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const updateReportUser = (req: Request, res: Response, next: NextFunction) => {
    const reportUser = new ReportUser({
        _id: req.params.id,
        username: req.body.username,
        promotionType: req.body.promotionType,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        hour: req.body.hour,
    });

    ReportUser.updateOne({_id: req.params.id}, reportUser).then(
        () => {
            res.status(201).json({
                message: 'Report User Updated Successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}



export default { updateReportUser, deleteReportUser, createReportUser, getAllReportUsers };
