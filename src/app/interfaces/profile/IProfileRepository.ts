import { Observable } from 'rxjs';
import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { IUser } from '~/interfaces/user/IUser';

export interface IProfileRepository {
  getMyLikedTaskList(currentUserId: IUser['id']): Observable<ILikedTaskCard[]>;
}
